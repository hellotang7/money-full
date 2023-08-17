import { defineComponent, reactive, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { hasError, validate } from "../shared/validate";
import { http } from "../shared/Http";
import { useBool } from "../hooks/useBool";
import { useRouter, useRoute } from "vue-router";
import { BackIcon } from "../shared/BackIcon";
import {useMeStore} from '../stores/useMeStore';
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const meStore = useMeStore()
    const refValidationCode = ref<any>();
    const router = useRouter();
    const route = useRoute();
    const formData = reactive({
      email: "2714148252@qq.com",
      code: "902046",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const {
      ref: refDisabled,
      toggle,
      on: disabled,
      off: enable,
    } = useBool(false);

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });

      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );


      if (!hasError(errors)) {
        const response = await http
            .post<{ jwt: string }>('/session', formData, {_autoLoading: true})
          .catch(onError);

        localStorage.setItem("jwt", response.data.jwt);

        meStore.refreshMe();
        router.push( "/");
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };
    const onClickSendValidationCode = async () => {
      disabled();
      const response = await http
        .post("/validation_codes", { email: formData.email },{_autoLoading: true})
        .catch(onError)
        .finally(enable);
      //成功
      refValidationCode.value.startCount();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="login"></Icon>
                <p class={s.title}>欢迎登录</p>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  error={errors.email?.[0] ?? "　"}
                  placeholder="请输入邮箱，然后点击发送验证码"
                />

                <FormItem
                  label="验证码"
                  type="validationCode"
                  v-model={formData.code}
                  error={errors.code?.[0] ?? "　"}
                  placeholder="请输入验证码"
                  onClick={onClickSendValidationCode}
                  countFrom={3}
                  disabled={refDisabled.value}
                  ref={refValidationCode}
                />
                <FormItem class={s.login}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});

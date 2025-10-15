import { AuthError } from "@supabase/supabase-js";

const AUTH_ERROR_MESSAGE_MAP: Record<string, string> = {
  email_exists: "이미 사용 중인 이메일입니다.",
  phone_exists: "이미 사용 중인 전화번호입니다.",
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  user_not_found: "해당 유저를 찾을 수 없습니다.",
  session_expired: "세션이 만료되었습니다. 다시 로그인해주세요.",
  email_not_confirmed: "이메일 인증이 필요합니다.",
  phone_not_confirmed: "전화번호 인증이 필요합니다.",
  weak_password: "비밀번호가 너무 약합니다.",
  signup_disabled: "현재 회원가입이 불가능한 상태입니다.",
  user_already_exists: "이미 가입된 사용자입니다.",
  captcha_failed: "보안 인증에 실패했습니다. 다시 시도해주세요.",
  over_email_send_rate_limit:
    "이메일 전송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
  over_sms_send_rate_limit:
    "문자 전송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
  otp_expired: "OTP 코드가 만료되었습니다. 다시 시도해주세요.",
  otp_disabled: "OTP 사용이 비활성화되어 있습니다.",
  email_address_invalid: "유효하지 않은 이메일 주소입니다.",
  same_password: "이전과 동일한 비밀번호는 사용할 수 없습니다.",
  validation_failed: "이메일 주소가 올바르게 입력되지 않았습니다",
};

export function generateErrorMessage(error: unknown) {
  if (error instanceof AuthError && error.code) {
    return (
      AUTH_ERROR_MESSAGE_MAP[error.code] ??
      "알 수 없는 인증 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
    );
  }

  return "문제가 발생했습니다. 잠시 후 다시 시도해주세요";
}

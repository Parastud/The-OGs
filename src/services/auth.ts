import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  mutation Signin($phone: String!, $role: Role) {
    signin(phone: $phone, role: $role) {
      success
      message
      debugOtp
    }
  }
`;

export const VERIFY_OTP_MUTATION = gql`
  mutation VerifyOtp($phone: String!, $otp: String!) {
    verifyOtp(phone: $phone, otp: $otp) {
      success
      message
      token
      user {
        _id
        fullname
        email
        phone
        createdAt
      }
    }
  }
`;

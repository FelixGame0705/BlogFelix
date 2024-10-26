export type UserProfileToken = {
    userID: string;
    userName: string;
    email: string;
    token: string;
}

export type UserProfile = {
    userName: string;
    email: string;
    userID: string;
}

export type UserGoogleProfile = {
    avatarUrl: string;
    email: string;
    fullName:string;
}

export type UserDeCodeToken = {
    nameid: string;
    email: string;         // Địa chỉ email của người dùng
    given_name: string;    // Tên người dùng
    role: string;          // Vai trò của người dùng
    nbf: number;           // Thời gian bắt đầu có hiệu lực (Not Before)
    exp: number;           // Thời gian hết hạn
    iat: number;           // Thời gian phát hành
    iss: string;           // Địa chỉ phát hành
    aud: string;           // Đối tượng được cấp phát
}
export type PostAuthorResponse = {
    postAuthorID: number,
    postID: number,
    appUserID: string
}
export interface UserInfo {
    userName?: string,
    email?: string,
    avatarUrl: string
}

export interface GoogleUser {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    hd: string;
    email: string;
    email_verified: boolean;
    nbf: number;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    iat: number;
    exp: number;
    jti: string;
  }
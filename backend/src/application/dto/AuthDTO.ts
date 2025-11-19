export interface LoginDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

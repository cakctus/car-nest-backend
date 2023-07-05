class UserDto {
  constructor(
    public email: string,
    public id: number,
    public isActivated: boolean,
  ) {}
}

export default UserDto;

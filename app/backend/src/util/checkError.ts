export default class checkError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public error = () => ({
    status: this.status,
    message: this.message,
  });
}

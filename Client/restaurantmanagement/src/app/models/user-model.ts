export class User {
  firstName: String;
  lastName: String;
  username: String;  
  email: String;
  password: String;
  phone: String;
  status: String;
  role: String;
  constructor(firstName: String, lastName: String, username: String, email: String, password: String, phone: String, status: String,
    role: String) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status;
    this.role = role;

  }
}

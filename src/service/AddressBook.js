import axios from "axios";
class AddressBookService{
baseUrl="http://localhost:8080";
addContact(data){
    return axios.post(`${this.baseUrl}/add`, data);
}
getAllContact() {
    return axios.get(`${this.baseUrl}/getAll`);
  }

  getContactById(id) {
    return axios.get(`${this.baseUrl}/getById/${id}`);
  }

  deleteContact(id) {
    return axios.delete(`${this.baseUrl}/delete/${id}`);
  }
  updateContact(id, data) {
    return axios.put(`${this.baseUrl}/update/${id}`, data);
  }
}

const addressBookService = new AddressBookService();
export default addressBookService;
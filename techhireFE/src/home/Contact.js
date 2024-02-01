import React from "react";
import Footer from "./Footer";
import Alert from "react-s-alert";
import { sendMailOfContact } from "../util/APIUtils";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            name: '',
            toEmail: '',
            description: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        console.log(props);
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const request = Object.assign({}, this.state);

        sendMailOfContact(request)
            .then(response => {
                console.log(response)
                Alert.success("Email đã gửi tới ứng viên")
            }).catch(
                
            )

    }
    render() {
        return (
            <main>
                <div class="container-xxl py-5">
                    <div class="container">
                        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Contact For Any Query</h1>
                        <div class="row g-4">
                            <div class="col-12">
                                <div class="row gy-4">
                                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                                        <div class="d-flex align-items-center bg-light rounded p-4">
                                            <div class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                                <i class="fa fa-map-marker-alt text-primary"></i>
                                            </div>
                                            <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.3s">
                                        <div class="d-flex align-items-center bg-light rounded p-4">
                                            <div class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                                <i class="fa fa-envelope-open text-primary"></i>
                                            </div>
                                            <span>luongvb2k1@gmail.com</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.5s">
                                        <div class="d-flex align-items-center bg-light rounded p-4">
                                            <div class="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                                                <i class="fa fa-phone-alt text-primary"></i>
                                            </div>
                                            <span>+0378679456</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <iframe class="position-relative rounded w-100 h-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6308940080485!2d105.83993977471378!3d21.007427888511927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8a922653a9%3A0x6c2ec19683313eab!2zMSDEkOG6oWkgQ-G7kyBWaeG7h3QsIELDoWNoIEtob2EsIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1706163826737!5m2!1svi!2s%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"
                                    frameborder="0" style={{ minHeight: "400px", border: "0" }} allowfullscreen="" aria-hidden="false"
                                    tabindex="0"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>

        )
    }
}

export default Contact;
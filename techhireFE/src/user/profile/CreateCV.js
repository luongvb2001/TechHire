import React from "react";
import SidebarNav from './SidebarNav';
import Footer from '../../home/Footer';
import FileService from '../service/FileService';
import Alert from 'react-s-alert';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
import { Redirect } from "react-router-dom";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    },
};

class CreateCV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvName: '',
            fullName: '',
            sex: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            website: '',
            address: '',
            careerObjective: '',
            educations: [
                {
                  startDate: '',
                  endDate: '',
                  education: '',
                },
            ],
            projects: [
                {
                  startDate: '',
                  endDate: '',
                  project: '',
                },
            ],
            activities: [
                {
                  startDate: '',
                  endDate: '',
                  activity: '',
                },
            ],
            skills: '',
            profileImage: null,
            selectedImage: null,



        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(props);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue,
        });
    }

    handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const educations = [...this.state.educations];
        educations[index][name] = value;
        this.setState({ educations });
    };

    handleAddEducation = () => {
        const educations = [...this.state.educations, { startDate: '', endDate: '', education: '' }];
        this.setState({ educations });
    };

    handleRemoveEducation = (index) => {
        const educations = [...this.state.educations];
        educations.splice(index, 1);
        this.setState({ educations });
    };

    handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const projects = [...this.state.projects];
        projects[index][name] = value;
        this.setState({ projects });
    };

    handleAddProject = () => {
        const projects = [...this.state.projects, { startDate: '', endDate: '', project: '' }];
        this.setState({ projects });
    };

    handleRemoveProject = (index) => {
        const projects = [...this.state.projects];
        projects.splice(index, 1);
        this.setState({ projects });
    };

    handleActivityChange = (index, e) => {
        const { name, value } = e.target;
        const activities = [...this.state.activities];
        activities[index][name] = value;
        this.setState({ activities });
    };

    handleAddActivity = () => {
        const activities = [...this.state.activities, { startDate: '', endDate: '', activity: '' }];
        this.setState({ activities });
    };

    handleRemoveActivity = (index) => {
        const activities = [...this.state.activities];
        activities.splice(index, 1);
        this.setState({ activities });
    };

    // onFileChange = (event) => {
    //     this.setState({
    //         profileImage: event.target.files,
    //         selectedImage: URL.createObjectURL(event.target.files[0]),
    //     });
    // }

    onFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = () => {
          this.setState({
            profileImage: event.target.files,
            selectedImage: reader.result, // Lưu trữ ảnh dưới dạng dataURL
          });
        };
      
        if (file) {
          reader.readAsDataURL(file); // Đọc file ảnh dưới dạng dataURL
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.cvName);
        

        if (this.state.profileImage) {
            for (const key of Object.keys(this.state.profileImage)) {
                formData.append('avatar', this.state.profileImage[key]);
                checkFileSize(this.state.profileImage[key])
            }
        } else {
            Alert.error("Vui lòng upload ảnh đại diện CV");
        }

        const stateCopy = { ...this.state };
        delete stateCopy.selectedImage;
        const jsonCv = JSON.stringify(stateCopy);
        formData.append('cvDetail', jsonCv);


        FileService.createCv(formData)
        .then((response) => {
            console.log(response.data);
                Alert.success('Tạo CV mới thành công');
            this.setState({
                cvName: '',
                fullName: '',
                sex: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
                website: '',
                address: '',
                careerObjective: '',
                educations: [
                    {
                    startDate: '',
                    endDate: '',
                    education: '',
                    },
                ],
                projects: [
                    {
                    startDate: '',
                    endDate: '',
                    project: '',
                    },
                ],
                activities: [
                    {
                    startDate: '',
                    endDate: '',
                    activity: '',
                    },
                ],
                skills: '',
                profileImage: null,
                selectedImage: null,
            })
        }).catch(error => {
            console.log(error && error.message);
        });
    }

    // xuất pdf
    handlePreviewPDF = () => {
        const formattedDate = moment(this.state.dateOfBirth).format("DD/MM/YYYY");
        let careerObjectives = this.state.careerObjective.split('\n');
        if (this.state.profileImage) {
            const documentDefinition = {
                defaultStyle: {
                    font: 'Roboto',
                },
                content: [
                    {
                        columns: [
                            { image: this.state.selectedImage, width: 100, },
                            {
                                stack: [
                                    { text: `${this.state.fullName}`, fontSize: 28, bold: 'true' },
                                    {
                                        columns: [
                                            { text: `Ngày sinh: `, fontSize: 11, bold: 'true' },
                                            { text: `${formattedDate}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 10, 0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Giới tính: `, fontSize: 11, bold: 'true' },
                                            { text: `${this.state.sex}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Email: `, fontSize: 11, bold: 'true' },
                                            { text: `${this.state.email}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Số điện thoại: `, fontSize: 11, bold: 'true' },
                                            { text: `${this.state.phoneNumber}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Website: `, fontSize: 11, bold: 'true' },
                                            { text: `${this.state.website}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                    {
                                        columns: [
                                            { text: `Địa chỉ: `, fontSize: 11, bold: 'true' },
                                            { text: `${this.state.address}`, fontSize: 11 },
                                        ],
                                        columnGap: -150,
                                        margin: [0, 2],
                                    },
                                ],
                                margin: [40, 0, 0, 0],
                            }
                        ],
                    },

                    // Mục tiêu nghề nghiệp
                    { text: `Mục tiêu nghề nghiệp `, bold: true, fontSize: 14, margin: [0, 20, 0, 0], },
                    {
                        canvas: [
                            {
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                
                    {
                        ul: [
                            ...careerObjectives.map((careerObjective) => [
                                {text: `${careerObjective}`, fontSize: 11},
                            ]),
                        ]
                    },
            
                    // Mục "Học vấn"
                    { text: `Học vấn `, bold: true, fontSize: 14, margin: [0, 20, 0, 0], },
                    {
                        canvas: [
                            {
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...this.state.educations.map((education) => [
                        {
                            columns: [
                                {
                                    text: `${moment(education.startDate).format("MM/YYYY")} - ${moment(education.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: education.education, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Dự án tham gia"
                    { text: "Dự án tham gia", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...this.state.projects.map((project) => [
                        {
                            columns: [
                                {
                                    text: `${moment(project.startDate).format("MM/YYYY")} - ${moment(project.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: project.project, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Hoạt động"
                    { text: "Hoạt động", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    ...this.state.activities.map((activity) => [
                        {
                            columns: [
                                {
                                    text: `${moment(activity.startDate).format("MM/YYYY")} - ${moment(activity.endDate).format("MM/YYYY")}`,
                                    fontSize: 11,
                                    bold: true,
                                },
                                { text: activity.activity, fontSize: 11 },
                            ],
                            columnGap: -240,
                            margin: [0, 2],
                        },
                        {
                            canvas: [
                                {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: 500,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#dddddd',
                                },
                            ],
                            margin: [0, 10, 0, 10],
                        },
                    ]),
            
                    // Mục "Kỹ năng"
                    { text: "Kỹ năng", fontSize: 14, bold: true },
                    {
                        canvas: [
                            {
                            type: 'line',
                            x1: 0,
                            y1: 5,
                            x2: 500,
                            y2: 5,
                            lineWidth: 1,
                            lineColor: '#000000',
                            },
                        ],
                        margin: [0, 0, 0, 10],
                    },
                    {text: `${this.state.skills}`}
                ],
            };
        
            // pdfMake.createPdf(documentDefinition).open();
            const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

            // Đặt tên cho file PDF
            const fileName = "ten_file.pdf";

            // Mở file PDF trong trình duyệt với tên đã đặt
            pdfDocGenerator.open({}, window.open('', '_blank').document, fileName);
        }else{
            Alert.error("Vui lòng upload ảnh đại diện CV");
        }
        
    };

    render() {
        if (!this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }} />;
        }
        return (
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">Ứng Viên</span>
                        </a>
                        <SidebarNav />
                    </div>
                </nav>

                <div className="main">

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title">Tải lên CV</h5>

                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div class="mb-3">
                                            <label class="form-label">Tên CV</label>
                                            <input type="text" class="form-control" name='cvName'
                                                value={this.state.cvName} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Họ và tên</label>
                                            <input type="text" class="form-control" name='fullName'
                                                value={this.state.fullName} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Ngày sinh</label>
                                            <input type="date" class="form-control" name='dateOfBirth'
                                                value={this.state.dateOfBirth} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Giới tính</label>
                                            <input type="text" class="form-control" name='sex'
                                                value={this.state.sex} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" name='email'
                                                value={this.state.email} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Số điện thoại</label>
                                            <input type="tel" class="form-control" name='phoneNumber'
                                                value={this.state.phoneNumber} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Website</label>
                                            <input type="text" class="form-control" name='website'
                                                value={this.state.website} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Địa chỉ</label>
                                            <input type="text" class="form-control" name='address'
                                                value={this.state.address} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Mục tiêu nghề nghiệp</label>
                                            <textarea type="text" class="form-control" style={{ lineHeight: '1.2' }} rows={7} name='careerObjective'
                                                value={this.state.careerObjective} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Học vấn</label>
                                            {this.state.educations.map((education, index) => (
                                                <div key={index}>
                                                    <div class="row">
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="startDate"
                                                                class="form-control"
                                                                value={education.startDate}
                                                                onChange={(e) => this.handleEducationChange(index, e)}
                                                                placeholder="Ngày bắt đầu"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="endDate"
                                                                class="form-control"
                                                                value={education.endDate}
                                                                onChange={(e) => this.handleEducationChange(index, e)}
                                                                placeholder="Ngày kết thúc"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            {index > 0 && <button type="button" class="btn btn-secondary" onClick={() => this.handleRemoveEducation(index)}>
                                                                Xóa học vấn
                                                            </button>}
                                                        </div>
                                                    </div>
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        name="education"
                                                        style={{ lineHeight: '1.2' }} 
                                                        rows={7}
                                                        value={education.education}
                                                        onChange={(e) => this.handleEducationChange(index, e)}
                                                        placeholder="Học vấn"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <button type="button" class="btn btn-secondary" onClick={this.handleAddEducation}>
                                                Thêm học vấn
                                            </button>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Dự án tham gia</label>
                                            {this.state.projects.map((project, index) => (
                                                <div key={index}>
                                                    <div class="row">
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="startDate"
                                                                class="form-control"
                                                                value={project.startDate}
                                                                onChange={(e) => this.handleProjectChange(index, e)}
                                                                placeholder="Ngày bắt đầu"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="endDate"
                                                                class="form-control"
                                                                value={project.endDate}
                                                                onChange={(e) => this.handleProjectChange(index, e)}
                                                                placeholder="Ngày kết thúc"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            {index > 0 && <button type="button" class="btn btn-secondary" onClick={() => this.handleRemoveProject(index)}>
                                                                Xóa dự án
                                                            </button>}
                                                        </div>
                                                    </div>
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        name="project"
                                                        style={{ lineHeight: '1.2' }} 
                                                        rows={7}
                                                        value={project.project}
                                                        onChange={(e) => this.handleProjectChange(index, e)}
                                                        placeholder="Dự án"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <button type="button" class="btn btn-secondary" onClick={this.handleAddProject}>
                                                Thêm dự án
                                            </button>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Hoạt động</label>
                                            {this.state.activities.map((activity, index) => (
                                                <div key={index}>
                                                    <div class="row">
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="startDate"
                                                                class="form-control"
                                                                value={activity.startDate}
                                                                onChange={(e) => this.handleActivityChange(index, e)}
                                                                placeholder="Ngày bắt đầu"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            <input
                                                                type="month"
                                                                name="endDate"
                                                                class="form-control"
                                                                value={activity.endDate}
                                                                onChange={(e) => this.handleActivityChange(index, e)}
                                                                placeholder="Ngày kết thúc"
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-6 col-sm-4">
                                                            {index > 0 && <button type="button" class="btn btn-secondary" onClick={() => this.handleRemoveActivity(index)}>
                                                                Xóa hoạt động
                                                            </button>}
                                                        </div>
                                                    </div>
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        name="activity"
                                                        value={activity.activity}
                                                        style={{ lineHeight: '1.2' }} 
                                                        rows={7}
                                                        onChange={(e) => this.handleActivityChange(index, e)}
                                                        placeholder="Hoạt động"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                            <button type="button" class="btn btn-secondary" onClick={this.handleAddActivity}>
                                                Thêm hoạt động
                                            </button>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Kỹ năng</label>
                                            <textarea type="text" class="form-control" style={{ lineHeight: '1.2' }} rows={7} name='skills'
                                                value={this.state.skills} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Tải Hình Ảnh</label>
                                            <input class="form-control" type="file" accept="image/*" onChange={this.onFileChange} />
                                            {this.state.selectedImage && <img src={this.state.selectedImage} alt="Selected" style={{ height: '200px', width: 'auto' }}/>}
                                        </div>

                                        <button type="submit" class="btn btn-primary">Submit</button>
                                        <button type="button" class="btn btn-primary" onClick={this.handlePreviewPDF}>
                                            Xem Trước
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

}

function checkFileSize(file) {
    const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
    const maxSizeInMB = 1; // Maximum allowed file size in MB
  
    if (fileSizeInMB > maxSizeInMB) {
        Alert.error('Dung lượng của file quá 1MB. Mong người dùng kiểm tra lại');
    }
  
    return "File size is within the allowed limit.";
  }

export default CreateCV;
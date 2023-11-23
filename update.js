import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserProfile = () => {
  const initialUserData = {
    users: {
      userid: null,
      username: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
      usertype: "",
      status: null,
      createdon: "",
      createdby: "",
      updatedon: "",
      updatedby: ""
    },
    user_details: {
      srno: null,
      userid: null,
      whatsapp_mobile: "",
      city: "",
      hometown: "",
      college: "",
      university: "",
      passing_year: "",
      branch: "",
      password: "",
      linkedinid: "",
      githubid: "",
      currentcompany: "",
      yearsOfExperience: "",
      currentDesignation: "",
      noticePeriod: "",
      currentSalary: "",
      skills: "",
      dob: null,
      workLocation: "",
      typePartFull: "",
      typeFullIntern: "",
      jobType: "",
      uploadCV: "",
      isactive: null,
      createdby: "",
      createdon: null,
      updatedby: "",
      updatedon: null
    },
    reg_users_courses: {
      srno: null,
      regid: "",
      userid: null,
      courseid: "",
      regdate: "",
      referredby: "",
      regstatus: "",
      totalfee: "",
      paidfee: "",
      duefee: "",
      certificateid: "",
      grade: "",
      certiDeliverStatus: "",
      completionStatus: "",
      createdby: "",
      createdon: null,
      updatedby: "",
      updatedon: null
    }
  };

  const [formData, setFormData] = useState(initialUserData);
  const [updateData, setUpdateData] = useState(initialUserData);
  const { userid } = useParams();
  const navigate = useNavigate();
  
  const createPayloadData = () => {
    return {
      users: [
        {
          ...updateData.users,
          createdon: updateData.users.createdon || null,
          createdby: updateData.users.createdby || "",
        }
      ],
      user_details: [
        {
          ...updateData.user_details,
          dob: updateData.user_details.dob || null,
          createdon: updateData.user_details.createdon || null,
          updatedon: updateData.user_details.updatedon || null,
        }
      ],
      reg_users_courses: [
        {
          ...updateData.reg_users_courses,
          createdon: updateData.reg_users_courses.createdon || null,
          updatedon: updateData.reg_users_courses.updatedon || null,
        }
      ]
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/course/searchById/${userid}`);
        if (res.status === 200) {
          setFormData({
            users: res.data.users[0],
            user_details: res.data.user_details[0],
            reg_users_courses: res.data.reg_users_courses[0]
          });
          setUpdateData({
            users: { ...res.data.users[0] },
            user_details: { ...res.data.user_details[0] },
            reg_users_courses: { ...res.data.reg_users_courses[0] }
          });
        } else {
          console.log("error");

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userid]);

  const handleUpdate = async () => {
    try {
      const payloadData = createPayloadData();
      const res = await axios.put("http://localhost:4000/course/update", payloadData);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/updateregisteredusers")
        }, 1500);

        setFormData({
          users: { ...updateData.users },
          user_details: { ...updateData.user_details },
          reg_users_courses: { ...updateData.reg_users_courses }
        });
        toast.success('Updated Successfully', {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
      })
      } else {
        toast.error('Category not updated', {
          position: "top-center",
          autoClose: 1000,
          theme: "colored",
      })
        console.log("Error updating user data");
      }
    } catch (error) {
      toast.error('Not updated Something wrong!', {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
    })
      console.error(error);
    }
  };
  const handleChange = (e, category) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [name]: value
      }
    }));
  };
console.log(updateData);
  return (
    <>
      <div className='row maincontent'>
        <div className='col-2 bg-info bg-opacity-10'>
        </div>
        <div className='col-8 bg-success bg-opacity-10'>
          <form >
            <h2 className='text-center m-2'>User Data</h2>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Name</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={updateData.users.name}
                  onChange={(e) => handleChange(e, "users")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Email</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={updateData.users.email}
                  onChange={(e) => handleChange(e, "users")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Mobile</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="mobile"
                  value={updateData.users.mobile}
                  onChange={(e) => handleChange(e, "users")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">usertype</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="usertype"
                  name="usertype"
                  value={updateData.users.usertype}
                  onChange={(e) => handleChange(e, "users")}
                />
              </div>
            </div>
           
            <div className="form-group row">
              <label className="col-sm-5 col-form-label"> City</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  value={updateData.user_details.city}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Hometown</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="hometown"
                  value={updateData.user_details.hometown}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">College</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="university"
                  value={updateData.user_details.college}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">University</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="university"
                  value={updateData.user_details.university}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Passing Year</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="passing_year"
                  value={updateData.user_details.passing_year}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Branch</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="branch"
                  value={updateData.user_details.branch}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Linkedin</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="linkedin"
                  value={updateData.user_details.linkedinid}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Githubid</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="github"
                  value={updateData.user_details.githubid}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Current Company</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="currentcompany"
                  value={updateData.user_details.currentcompany}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Years of experience</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="yearsOfExperience"
                  value={updateData.user_details.yearsOfExperience}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Current Designation</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="currentDesignation"
                  value={updateData.user_details.currentDesignation}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Notice Period</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="noticePeriod"
                  value={updateData.user_details.noticePeriod}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Current Salary</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="currentSalary"
                  value={updateData.user_details.currentSalary}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Skills</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="skills"
                  value={updateData.user_details.skills}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Date of Birth</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="date"
                  name="dob"
                  value={updateData.user_details.dob}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Work Location</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="worklocation"
                  value={updateData.user_details.workLocation}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Full Time</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="typePartFull"
                  value={updateData.user_details.typePartFull}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Full Time Inter </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="typeFullIntern"
                  value={updateData.user_details.typeFullIntern}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Job type </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="jobtype"
                  value={updateData.user_details.jobType}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Upload Your Resume</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="uploadCV"
                  value={updateData.user_details.uploadCV}
                  onChange={(e) => handleChange(e, "user_details")}
                />
              </div>
            </div>
            
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Course Id </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="courseid"
                  value={updateData.reg_users_courses.courseid}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Reffered By </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="referredby"
                  value={updateData.reg_users_courses.referredby}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Registration Status </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="regstatus"
                  value={updateData.reg_users_courses.regstatus}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Toatal fee </label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="totalfee"
                  value={updateData.reg_users_courses.totalfee}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Paid Fee</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="paidfee"
                  value={updateData.reg_users_courses.paidfee}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Due fee</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="duefee"
                  value={updateData.reg_users_courses.duefee}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Certificate Id</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="certificateid"
                  value={updateData.reg_users_courses.certificateid}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Grade</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="grade"
                  value={updateData.reg_users_courses.grade}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Certificate Deliver Status</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="certiDeliverStatus"
                  value={updateData.reg_users_courses.certiDeliverStatus}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Completion Status</label>
              <div className='col-sm-7'>
                <input
                  className="form-control"
                  type="text"
                  name="completionStatus"
                  value={updateData.reg_users_courses.completionStatus}
                  onChange={(e) => handleChange(e, "reg_users_courses")}
                />
              </div>
            </div>
            <button type="button" className="btn btn-success m-3" onClick={handleUpdate}>
              Update
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
--------------------------------------------------
//http://localhost:4000/course/update
router.put('/update', async (req, res) => {
    
    try {
        const { name, email, mobile, usertype } = req.body.users[0];

        const { city, hometown, college, university, passing_year, branch, linkedinid, githubid,
            currentcompany, yearsOfExperience, currentDesignation, noticePeriod, currentSalary, skills, dob, workLocation,
            typePartFull, typeFullIntern, jobType, uploadCV } = req.body.user_details[0];

        const { courseid, referredby, regstatus, totalfee, paidfee, duefee,
            certificateid, grade, certiDeliverStatus, completionStatus } = req.body.reg_users_courses[0];

        const response = await db.promise()
            .query(`update users set name='${name}',email='${email}',mobile='${mobile}',usertype='${usertype}' 
        where userid=${req.body.users[0].userid}`);

        const response1 = await db.promise()
            .query(`update user_details set city='${city}',hometown='${hometown}',college='${college}',university='${university}',
        passing_year='${passing_year}',branch='${branch}',linkedinid='${linkedinid}',githubid='${githubid}',
        currentcompany='${currentcompany}',yearsOfExperience='${yearsOfExperience}',currentDesignation='${currentDesignation}',
        noticePeriod='${noticePeriod}',currentSalary='${currentSalary}',skills='${skills}',dob='${dob}',
        workLocation='${workLocation}',typePartFull='${typePartFull}',typeFullIntern='${typeFullIntern}',jobType='${jobType}',
        uploadCV='${uploadCV}' where userid= ${req.body.user_details[0].userid}`);

        const response2 = await db.promise()
            .query(`update reg_users_courses set courseid='${courseid}',referredby='${referredby}',regstatus='${regstatus}',
        totalfee='${totalfee}',paidfee='${paidfee}',duefee='${duefee}',certificateid='${certificateid}',grade='${grade}',
        certiDeliverStatus='${certiDeliverStatus}',completionStatus='${completionStatus}'
        where userid= ${req.body.reg_users_courses[0].userid} `);

        res.status(201).json({ message: "Table Updated." });

    }
    catch (err) {
        res.status(400).json({ message: err });
        console.log(err)
    }
});

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../Redux/acion/LoginAction.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./header.css";
function Header(props) {
  let [loginFlag, setFlag] = useState(false);
  let [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
    window.addEventListener("resize", () => {
      console.log(window.innerWidth)
      if (window.innerWidth > 768) {
        setOpen((open = true));
      }else{
        setOpen((open = false));

      }
    });

    if (props.AuthData.Auth.LoginKey !== "") {
      setFlag((loginFlag = true));
    } else {
      // console.log("ok");
      setFlag((loginFlag = false));
    }
  });

  function logoutHandle() {
    let params = {
      loginKey: props.AuthData.Auth.LoginKey
    };
    props.logout(params).then(() => {
      // console.log(props)
      logoutRout();
      // props.history.replace("/home");
    });
  }
  function logoutRout() {
    // console.log(props)
    // props.history.replace("/home");
  }

  return (
    <div className="row header_main">
      {/* {console.log(loginFlag)} */}
      <div className="header">
        {loginFlag && (
          <div>
          <p onClick={logoutHandle} className="logout-btn">
            LogOut
          </p>
          <p className='wellcome-text'>Welcome</p>
          </div>
        )}
        {!loginFlag && <p className="header-Title">SaveMoney</p>}
      </div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This web app is currently only for mobile/table view
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
  //   // console.log(state.educationHub.courseCategories.categories)
  return {
    AuthData: state.authData
    //     // getRolesData: state.rolesData.getRolesData.data,
    //     userData: state.smsData.userLogin.userData
    //     // getAddDepartmentSetupData:
    //     //   state.DepartmentSetupData.getAddDepartmentSetupData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: data => dispatch(logout(data))
    // updateDepartments: data => dispatch(updateDepartments(data)),
    // deleteDepartments: data => dispatch(deleteDepartments(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

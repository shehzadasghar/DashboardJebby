import React from "react"
import SideBar from "../components/sidebar/Sidebar"
import AllTermsAndPolicy from "../components/AllTermsAndPolicy/AllTermsAndPolicy"


const TermsAndPolicy = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <AllTermsAndPolicy />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <AllTermsAndPolicy />
            </div>
        </>
    )
}
export default TermsAndPolicy








// const handleUpdate = () => {
//     const updatedContentState = editorState.getCurrentContent();
//     const updatedContentPlainText = updatedContentState.getPlainText().trim();
//     if (updatedContentPlainText.length > 0) {
//       const updatedDescription = JSON.stringify(convertToRaw(updatedContentState));
//       const submit = { description: updatedDescription };
//       fetch(`${config['baseUrl']}/termsAndConditionInsertAndUpdate`, {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify(submit)
//       })
//         .then(res => res.json())
//         .then(() => {
//           window.location.reload(true);
//           console.log('Updated terms and conditions');
//         })
//         .catch(error => {
//           console.error('Error updating data:', error);
//         });
//     } else {
//       console.log('Editor content is empty. No update needed.');
//     }
//   };
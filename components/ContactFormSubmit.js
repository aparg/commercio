import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  let baseUrl = "https://api.homebaba.ca";
  let fubUrl = "https://api.followupboss.com/v1/events";
  setSubmitbtn("Submitting...");

  let form_data = new FormData();

  // Get the root domain name
  const hostname = window.location.hostname || window.location.host;
  console.log("Current hostname:", hostname);

  let source = "localhost";
  if (hostname !== "localhost") {
    const parts = hostname.split(".");
    source = parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  }
  console.log("Extracted source:", source);

  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);
  // Convert source to string to ensure it's not null
  form_data.append("source", String(source));

  // Handle project name
  let newwww = "";
  if (msgdata.project_namee) {
    let neww = msgdata.project_namee.replaceAll("-", " ");
    const words = neww.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    newwww = words.join(" ");
  }
  form_data.append("proj_name", newwww || null);
  form_data.append("cityy", msgdata.cityy || null);

  // Follow Up Boss payload
  const fubPayload = {
    person: {
      contacted: false,
      firstName: msgdata.name.split(" ")[0],
      lastName: msgdata.name.split(" ").slice(1).join(" "),
      emails: [{ value: msgdata.email }],
      phones: [{ value: msgdata.phone }],
      tags: [
        msgdata.cityy || "",
        newwww || "",
        msgdata.realtor == "Yes" ? "Agent" : "",
      ].filter(Boolean),
    },
    source: "homebaba.ca",
    system: "Custom Website",
    type: "Inquiry",
    message: msgdata.message,
  };

  // Function to send data to Follow Up Boss
  const sendToFollowUpBoss = () => {
    return axios
      .post(fubUrl, fubPayload, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Basic ZmthXzAwTlVCbDF2bGZzRXhyZlZXMmNCYVlqMXJXZzJ6NUNoN2c6",
        },
      })
      .catch((error) => {
        console.error("Follow Up Boss submission failed:", error);
        // Don't throw error, just log it
        return null;
      });
  };

  let url = `${baseUrl}/api/contact-form-submit/`;
  axios
    .post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
      mode: "no-cors",
    })
    .then(() => {
      // Show success message immediately after Homebaba submission
      setSubmitbtn("Successfully Submitted");
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgdata,
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      // Send to Follow Up Boss in background
      sendToFollowUpBoss();

      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
    })
    .catch((errr) => {
      console.error("Homebaba submission failed:", errr);
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    });
}

export default ContactFormSubmit;

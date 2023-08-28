"use client"
import {useState} from "react";
import MultiSelectDropDown from "./MultiSelectDropDown";
const EditProfile = ({ user }) => {
    const [selectedCountries, setSelectedCountries] = useState(user.interestedCountries);
    const [selectedLocation, setSelectedLocation] = useState(user.currentCountry);
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState(user.image);
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);

    // console.log(user);
    const handleSubmit = (e) => {
        // e.preventDefault();
        // console.log(
        //     user.username,
        //     user.email,
        //     dateOfBirth,
        //     selectedCountries,
        //     selectedLocation,
        //     image

        // );
        fetch(`/api/users/${user._id}`, {
            method: "PATCH",
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                interestedCountries: user.interestedCountries,
                currentCountry: user.currentCountry,
                image: user.image,
            }),
        });

    };

  return (
    <div>
      <h1>Edit Profile</h1>

      <form className="flex flex-col"
        onSubmit={handleSubmit}
      >
        <img src={user?.image||image} alt="profile" 
            className="w-20 h-20 rounded-full object-cover"
        />
        <label htmlFor="image">Image</label>
        <input className="form_input" type="file" name="image" id="image" 
            onChange={(e) => setImage(e.target.files[0])}
        />

        <label htmlFor="name">Name</label>
        <input className="form_input" type="text" name="name" id="name" value={user.username} />
        <label htmlFor="email">Email</label>
        <input className="form_input" type="email" name="email" id="email" value={user.email} />
        <label htmlFor="dateOfbirth">Date of Birth</label>{" "}
        <input
        className="form_input"
          type="text"
          name="dateOfbirth"
          id="dateOfbirth"
          value={
            user.dateOfBirth?.split("T")[0]
        }
        />
        <label> Interesred Countries </label>
        <button className="border mb-4" type="button" onClick={() => setEdit(!edit)}>
            Edit
        </button>

        {
            <input className="form_input mb-4" type="text" value={
                selectedCountries?.length > 0 ?
                selectedCountries.map(
                    (country) => country.label
                ).join(", ")
                 : user?.interestedCountries?.join(", ")

            } style={{
                width : "100%",
                height : "5rem",
            }}/>
        }
        {edit && (
        <MultiSelectDropDown 
            check={true}
            // value={user.interestedCountries}
            setSelectedValues={setSelectedCountries}
        />)}

        <label> Current Country </label>
        <MultiSelectDropDown
            check={false}
            value={user.currentCountry}  
            setSelectedValues={setSelectedLocation}
        />

        <button className="black_btn mt-5" type="submit">
            Update
        </button>

      </form>
    </div>
  );
};

export default EditProfile;

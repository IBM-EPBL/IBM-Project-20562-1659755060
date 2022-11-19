import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CgLogOut } from "react-icons/cg";

const Feed = (props) => {
  //console.log(this.props.location.user)
  const [cyl, setCyl] = useState();
  const [disp, setDisp] = useState();
  const [hpo, setHpo] = useState();
  const [weight, setWeight] = useState();
  const [accel, setAccel] = useState();
  const [modyr, setModyr] = useState();
  const [origin, setOrigin] = useState();
  const [prediction, setPrediction] = useState();

  const onlogout = (e) => {
    let { history } = this.props
    sessionStorage.setItem("@user", false)
    history.push({ pathname: "/"});
    window.location.reload()
  }

  const signupHandler = (e) => {
    e.preventDefault();
    if (!cyl || !disp || !hpo || !weight || !accel || !modyr || !origin) {
      return;
    }
    const payload = {
      inp: [
        parseInt(cyl),
        parseInt(disp),
        parseInt(hpo),
        parseInt(weight),
        parseInt(accel),
        parseInt(modyr),
        parseInt(origin)]
    }
    axios.get("http://127.0.0.1:5000/get-key").then((mlkey, err) => {

      fetch('http://127.0.0.1:5000/get-performance', {
        method: 'POST',
        mode: 'cors',
        redirect: 'manual',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + mlkey.data
        }
      }).then((res) => {
        return res.json()
      }).then((result) => {
        setPrediction(result.predictions[0].values[0][0]);
      })
    })
    
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="m-20 bg-white container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <a onclick={onlogout} href="../login/"> <CgLogOut className='text-white text-5xl float-right -mt-16' /></a>
          <div className="px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Desired Input Parameters</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="cyl"
              placeholder="Cylinders"
              onChange={(e) => {
                setCyl(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="disp"
              placeholder="Displacement"
              onChange={(e) => {
                setDisp(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="hpo"
              placeholder="Horsepower"
              onChange={(e) => {
                setHpo(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="weight"
              placeholder="weight"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="accel"
              placeholder="acceleration"
              onChange={(e) => {
                setAccel(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="modyr"
              placeholder="Model Year"
              onChange={(e) => {
                setModyr(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="origin"
              placeholder="Origin"
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
            />

            <button
              type="submit"
              onClick={signupHandler}
              className="mt-10 w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Predict</button>
            {prediction ?
              <h1>Prediction : {prediction}</h1>
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed;
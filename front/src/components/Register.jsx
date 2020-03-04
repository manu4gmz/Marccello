import React from "react";
import Button from './Button.jsx'

export default ({ handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div className="form-row">
                <div className="col">
                    <input onChange={handleChange} name='inputUsername' type="text" className="form-control" placeholder="Username" />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input onChange={handleChange} name='inputEmail' type="email" className="form-control" id="inputEmail4" placeholder="Email" name="email" />
                </div>
                <div className="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input onChange={handleChange} name='inputPassword' type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                </div>
            </div>
            <div className="form-group">
                <label for="inputAddress">Address</label>
                <input onChange={handleChange} name='inputAddress' type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <Button buttonTxt={'Registrar'} />
        </form>
    )
}
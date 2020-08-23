import React from 'react'

const Preloader = () =>{
        return(
            <div className = 'row' style = {{'marginTop': '50px'}}>
                <div className = 'col s10 offset-s1'>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            </div>
        )
}
export default Preloader;
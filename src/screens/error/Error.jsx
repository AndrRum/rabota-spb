import React from "react";
import "./Error.css"

export const Error = ({onPress}) => {
    return (
        <section className="page_404">

            <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                    <h2 className="text-center ">Что-то пошло не так...</h2>
                </div>

                <div className="contant_box_404">
                    <button className="link_404" onClick={onPress}>Попробовать снова</button>
                </div>
            </div>

        </section>
    )
}
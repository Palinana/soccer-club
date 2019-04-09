import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Jersey from '../../../Resources/images/barcelona-jersey.png';

const PromotionAnimation = () => {
    return (
        <div className="promotion-animation">
           <div className="promotion-animation__left">
                <Zoom>
                    <div>
                        <span>Win a</span>
                        <span>Jersey</span>
                    </div>
                </Zoom>   
           </div>
           <div className="promotion-animation__right">
                <Zoom>
                    <div style={{background: `url(${Jersey}) no-repeat`}}>

                    </div>
                </Zoom>
           </div>
        </div>
    )
}

export default PromotionAnimation;
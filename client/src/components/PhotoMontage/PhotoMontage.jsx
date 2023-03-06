import './PhotoMontage.css';

import SSPhotoMain from '../../assets/images/SS/Capture8.PNG';
import ALPhotoMain from '../../assets/images/AL/Capture2.PNG';
import BBPhotoMain from '../../assets/images/BB/Capture.jpg';
import NKPhotoMain from '../../assets/images/NK/Capture8.PNG';
import JJPhotoMain from '../../assets/images/JJ/Capture.PNG';

function PhotoMontage() {
    const photoArray = [{
        photo: SSPhotoMain,
        text: 'SS'
    },
    {
        photo: ALPhotoMain,
        text: 'AL'
    },
    {
        photo: BBPhotoMain,
        text: 'BB'
    },
    {
        photo: NKPhotoMain,
        text: 'NK'
    },
    {
        photo: JJPhotoMain,
        text: 'JJ'
    }];

    return (
        <div className='photo-container'>
            {photoArray.map((item, index) =>
            <div className='photo-item' key={index}>
                <img src={item.photo} alt='Montage' />
                <p>{item.text}</p>
            </div>
            )}
        </div>
    )
}

export default PhotoMontage
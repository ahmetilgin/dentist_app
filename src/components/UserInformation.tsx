import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import After from "../static/after.png";
import Before from "../static/before.jpg";
import ScanViewer from './ScanViewer';
const UserInformation: React.FC = () => {


    const { t } = useTranslation()
    const images = [{
        src: After,
        alt: t('after'),
        downloadUrl: '',
    }, {
        src: Before,
        alt: t('before'),
        downloadUrl: '',
    }]

    const [state, setState] = useState({ visible: false, activeImageIndex: 0 });

    return (
        <Grid container style={{ padding: 0 }}>
            {images.map((item, index) => {
                return (
                    <div key={index.toString()} className="img-item">
                        <img src={item.src} alt={item.alt} className={"responsive"} onClick={() => {
                            setState({
                                visible: true,
                                activeImageIndex: index,
                            });
                        }} />
                    </div>
                );
            })}
            <ScanViewer
                imageURLs={images}
                index={state.activeImageIndex}
                visible={state.visible}
                onClose={() =>
                    setState({
                        visible: false,
                        activeImageIndex: 0,
                    })} />
        </Grid>
    );
};

export default UserInformation;

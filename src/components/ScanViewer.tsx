import React from 'react';
import Viewer from 'react-viewer';
import { ImageDecorator } from 'react-viewer/lib/ViewerProps';

const ScanViewer: React.FC<{ imageURLs: ImageDecorator[], index: number, visible: boolean, onClose: () => void }> = ({ imageURLs, index, visible, onClose }) => {

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            <Viewer
                visible={visible}
                downloadable={true}
                onClose={() => { onClose() }}
                images={imageURLs}
                activeIndex={index}
                zIndex={9999999}
            />
        </div>
    );
};

export default ScanViewer;
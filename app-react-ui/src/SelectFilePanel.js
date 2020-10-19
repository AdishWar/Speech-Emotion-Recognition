import React from 'react';

export default function SelectFilePanel() {

    return(
        <div className="select-file-panel">
            <form action="#" method="POST" encType="multipart/form-data">
                {/* <input type="file" class="custom-file-input" /> */}
                <input type="file" name="file" accept=".mp3" />
                <input type='submit' id="fetch-button" className="button-ready" value="Submit" />
            </form>
        </div>
    );
}
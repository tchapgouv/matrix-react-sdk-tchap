/*
Copyright 2020-2021 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import SdkConfig from 'matrix-react-sdk/src/SdkConfig';

export default class TchapServerPickerDialog extends React.PureComponent {
    static replaces = 'ServerPickerDialog';

    public render() {
        const hsList = SdkConfig.get()['hs_url_list'];
        const dropdownList = <select name="homeservers" id="homeservers">
            { hsList.map((url) => <option value="{url}">{ url }</option>) }
        </select>;
        return <div
            className="mx_ServerPickerDialog"
        >
            <form>
                <label htmlFor="homeservers">Choose a homeserver (todo translate this) :</label>
                { dropdownList }
                <input type="submit" value="Submit" />
            </form>
        </div>;
    }
}

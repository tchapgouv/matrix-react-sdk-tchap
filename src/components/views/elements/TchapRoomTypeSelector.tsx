/*
Copyright 2022 DINUM
*/

import React from 'react';
import classNames from "classnames";
import { _t } from 'matrix-react-sdk/src/languageHandler';
import * as sdk from 'matrix-react-sdk/src/index';

import { TchapRoomType } from "../../../@types/tchap";

import "../../../../res/css/views/elements/_TchapRoomTypeSelector.scss";

interface IProps {
    value: TchapRoomType;
    label: string;
    width?: number;
    showFederateSwitch: boolean;
    shortDomain: string;
    onChange(value: TchapRoomType, isFederated?: boolean): void;
}

interface IState {
  roomType: TchapRoomType;
  isFederated: boolean;
}

// todo rename, not a dropdown anymore
export default class TchapRoomTypeSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            roomType: TchapRoomType.Private,
            isFederated: false,
        };
    }

    private onRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const roomType = e.target.value as TchapRoomType;

        this.setState({ roomType: roomType });
        this.props.onChange(roomType);
    };

    private onFederateChange = (e: boolean): void => {
        const isFederated = e;
        this.setState({ isFederated: isFederated });
        this.props.onChange(this.state.roomType, isFederated);
    };

    public render(): JSX.Element {
        const StyledRadioButton = sdk.getComponent("elements.StyledRadioButton");
        const LabelledToggleSwitch = sdk.getComponent("elements.LabelledToggleSwitch");

        const privateClasses = classNames(
            "tc_TchapRoomTypeSelector_RadioButton",
            "tc_TchapRoomTypeSelector_private",
            {
                tc_TchapRoomTypeSelector_RadioButton_selected: this.state.roomType == TchapRoomType.Private,
            });
        const externalClasses = classNames(
            "tc_TchapRoomTypeSelector_RadioButton",
            "tc_TchapRoomTypeSelector_external",
            {
                tc_TchapRoomTypeSelector_RadioButton_selected: this.state.roomType == TchapRoomType.External,
            });
        const forumClasses = classNames(
            "tc_TchapRoomTypeSelector_RadioButton",
            "tc_TchapRoomTypeSelector_forum",
            {
                tc_TchapRoomTypeSelector_RadioButton_selected: this.state.roomType === TchapRoomType.Forum,
            });

        let roomFederateOpt;
        if (this.state.roomType === TchapRoomType.Forum && this.props.showFederateSwitch) {
            //todo: add traduction
            roomFederateOpt = (
                <div className="tc_CreateRoomDialog_RoomOption_suboption">
                    <LabelledToggleSwitch label={_t('Limit access to this room to domain members "%(domain)s"',
                        { domain: this.props.shortDomain })}
                    onChange={this.onFederateChange}
                    value={this.state.isFederated} />
                </div>
            );
        }

        return <div className="tc_TchapRoomTypeSelector_RadioButtons">
            <label className={privateClasses}>
                <StyledRadioButton
                    name="roomType"
                    value={TchapRoomType.Private}
                    checked={this.state.roomType === TchapRoomType.Private}
                    onChange={this.onRoomTypeChange}
                >
                    <div className="tc_TchapRoomTypeSelector_RadioButton_title">
                        { _t("Private room") }
                    </div>
                    <div>
                        { _t("Accessible to all users by invitation from an administrator.") }
                    </div>
                </StyledRadioButton>
            </label>
            <label className={externalClasses}>
                <StyledRadioButton
                    name="roomType"
                    value={TchapRoomType.External}
                    checked={this.state.roomType == TchapRoomType.External}
                    onChange={this.onRoomTypeChange}
                >
                    <div className="tc_TchapRoomTypeSelector_RadioButton_title">
                        { _t("Private room open to external users") }
                    </div>
                    <div>
                        { _t("Accessible to all users and to external guests by invitation of an administrator.") }
                    </div>
                </StyledRadioButton>
            </label>
            <label className={forumClasses}>
                <StyledRadioButton
                    name="roomType"
                    value={TchapRoomType.Forum}
                    checked={this.state.roomType == TchapRoomType.Forum}
                    onChange={this.onRoomTypeChange}
                >
                    <div className="tc_TchapRoomTypeSelector_RadioButton_title">
                        { _t("Forum room") }
                    </div>
                    <div>
                        { _t("Accessible to all users from the forum directory or from a shared link.") }
                    </div>
                    { roomFederateOpt }
                </StyledRadioButton>
            </label>
        </div>
        ;
    }
}

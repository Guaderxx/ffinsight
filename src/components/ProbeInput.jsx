import React, { useState } from "react";

const ProbeInput = ({ localFile, val, chVal, remoteFile }) => {
    return (
        <div className="container" style={{flexDirection:"row"}}>
            {/* 普通按钮 */}
            <button className="button-input" onClick={localFile}>
                本地文件
            </button>
            |
            {/* 带输入框的按钮 */}
            <div className="button-input">
                <input
                    type="text"
                    value={val}
                    onChange={chVal}
                    placeholder="请输入链接"
                />
                <button className="button-input"  onClick={remoteFile}>
                    网络文件
                </button>
            </div>
        </div>
    );
};

export default ProbeInput;

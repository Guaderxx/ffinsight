import ProbeInput from "./ProbeInput.jsx";
import ProbeMedia from "./ProbeMedia.jsx";
import {useState} from "react";
import {invoke} from "@tauri-apps/api/core";

const Probe = () => {
    const [probe, setProbe] = useState("{\"streams\":[], \"format\":{}}");
    const [remoteLink, setRemoteLink] = useState("");

    const getProbe = async (link) => {
        setProbe(await invoke("get_probe", { link }));
    }

    return (
        <div>
            <ProbeInput localFile={e => getProbe("local")}
                        val={remoteLink}
                        chVal={e => setRemoteLink(e.target.value)}
                        remoteFile={e => getProbe(remoteLink)}
                        />
            <ProbeMedia mediaData={JSON.parse(probe)} />
        </div>
    )
}

export default Probe;

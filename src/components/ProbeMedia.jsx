const fieldTranslations = {
    index: "索引",
    codec_name: "编解码器名称",
    codec_long_name: "编解码器全称",
    profile: "配置文件",
    codec_type: "编解码器类型",
    codec_tag_string: "编解码器标签字符串",
    codec_tag: "编解码器标签",
    width: "宽度",
    height: "高度",
    coded_width: "编码宽度",
    coded_height: "编码高度",
    has_b_frames: "B帧数量",
    pix_fmt: "像素格式",
    level: "级别",
    color_range: "色彩范围",
    chroma_location: "色度位置",
    refs: "参考帧数量",
    view_ids_available: "可用视图ID",
    view_pos_available: "可用视图位置",
    id: "ID",
    r_frame_rate: "帧率",
    avg_frame_rate: "平均帧率",
    time_base: "时间基准",
    start_pts: "起始PTS",
    start_time: "起始时间",
    duration_ts: "持续时间戳",
    duration: "持续时间",
    bit_rate: "比特率",
    nb_frames: "帧数",
    extradata_size: "额外数据大小",
    disposition: "配置",
    tags: "标签",
    filename: "文件名",
    nb_streams: "流数量",
    nb_programs: "节目数量",
    nb_stream_groups: "流组数量",
    format_name: "格式名称",
    format_long_name: "格式全称",
    size: "文件大小",
    probe_score: "探测分数",
    "sample_aspect_ratio": "采样宽高比",
    "display_aspect_ratio": "显示宽高比",
    "color_space": "色彩空间",
    "color_transfer": "色彩传输特性",
    "color_primaries": "色彩原色",
    "field_order": "场序",
    "is_avc": "是否为AVC",
    "nal_length_size": "NAL单元长度大小",
    "bits_per_raw_sample": "每原始样本位数",
    "sample_fmt": "采样格式",
    "sample_rate": "采样率",
    "channels": "声道数",
    "channel_layout": "声道布局",
    "bits_per_sample": "每样本位数",
    "initial_padding": "初始填充"
};

// 表格组件
const MediaTable = ({ data, title }) => {
    return (
        <div className="stream-section">
            <h2>{title}</h2>
            <table>
                <thead>
                <tr>
                    <th>字段</th>
                    <th>值</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td>{fieldTranslations[key] || key}</td>
                        <td>
                            {typeof value === "object" && value !== null
                                ? JSON.stringify(value, null, 2)
                                : value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// 主组件
const ProbeMedia = ({ mediaData }) => {
    const { streams, format } = mediaData;

    return (
        <div className="media-container">
            {/* 文件格式信息 */}
            <div className="media-column">
                <MediaTable data={format} title="文件格式信息" />
            </div>
            {/* 视频流信息 */}
            <div className="media-column">
                {streams
                    .filter((stream) => stream.codec_type === "video")
                    .map((stream) => (
                        <MediaTable key={stream.index} data={stream} title="视频流信息" />
                    ))}
            </div>
            {/* 音频流信息 */}
            <div className="media-column">
                {streams
                    .filter((stream) => stream.codec_type === "audio")
                    .map((stream) => (
                        <MediaTable key={stream.index} data={stream} title="音频流信息" />
                    ))}
            </div>
        </div>
    );
};

export default ProbeMedia;

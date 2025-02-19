use tauri_plugin_dialog::{DialogExt};
use tauri_plugin_shell::ShellExt;

const FAILED_STR: &str = "{\"streams\":[], \"format\": {\"filename\":\"invalid\"}}";

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn get_probe(app: tauri::AppHandle, link: String) -> String{
    let mut res = link.clone();

    if &link == "local" {
        let file_path = app.dialog().file().blocking_pick_file();
        let tmp = match file_path {
            Some(fp) => fp.to_string(),
            None => String::from("no file selected"),
        };
        if &tmp == "no file selected" {
            return FAILED_STR.parse().unwrap();
        }
        res = tmp;
    }
    let sidecar = app.shell().sidecar("ffprobe").unwrap().args(["-hide_banner","-v", "quiet", "-show_format", "-show_streams","-of",  "json","-i", &res]);

    let output = tauri::async_runtime::block_on(async move{
        sidecar.output().await.unwrap()
    });

    if output.status.success() {
        String::from_utf8(output.stdout).unwrap()
    } else {
        // println!("Exit: {}", output.status.code().unwrap());
        String::from(FAILED_STR)
    }
}

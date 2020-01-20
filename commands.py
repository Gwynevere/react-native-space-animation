import argparse
import os
import sys
import subprocess
from copy import deepcopy
from os import listdir
from os.path import isfile, join


class cd:
    """Context manager for changing the current working directory"""

    def __init__(self, newPath):
        self.newPath = os.path.expanduser(newPath)

    def __enter__(self):
        self.savedPath = os.getcwd()
        os.chdir(self.newPath)

    def __exit__(self, etype, value, traceback):
        os.chdir(self.savedPath)


## SCRIPT CONSTANTS

DEFAULT_APK_SRC_DIR = './android/app/build/outputs/apk/release/app-release.apk'
DEFAULT_APK_DST_DIR = '/storage/self/primary/'

DEFAULT_DEVICE = "-d"
DEFAULT_EMULATOR = "-e"

STRINGS = {
    'ENVIRONMENT_FILES': {
        'cmd_title': 'Setting env file to {}',
        'not_found': '####### environment files not found, skipping env initialization #',
    },
    'RR': {
        'launch': 'react-native run-android',
        'start': 'react-native start',
        'bundle': 'react-native bundle ...',
    },
    "ADB": {
        'reverse': 'link device and computer 8081 ports',
        'log': 'cross logging',
        'prompt_82': 'prompt key 82 on device',
        'uninstall': 'uninstall apk with id:{}',
        'install': 'install apk {}',
        'copy': 'copy apk {} to {}'
    },
    "GRADLE": {
        "clean": "clean apk build folder",
        "build": "build apk for release",
        "build_x": "build apk for release without bundling"
    },
    'PROCESS_RUNNER': {
        'start': '####### start process : {} #',
        'end': '####### end #'
    }
}

APP_ID = {
    'pb': 'ma.gbp.pocketbank',
    'sa': 'com.animationsx'
}

WORK_SPACE = {
    'pb': 'C:\\Users\\u958288\WebstormProjects\\PocketBank',
    'sa': 'C:\\Users\\u958288\\WebstormProjects\\react-native-space-animation'
}

ENV_FILE = {
    'dev': ".env",
    'hom': ".env.homologation",
    'prod': ".env.production",
    'local': ".env.local"
}

CMD_S = {
    'rr': ["react-native", "run-android"],
    'rr_s': ["react-native", "start"],
    'rr_b': ["react-native", "bundle", "--platform android", "--dev false", "--entry-file", "index.js",
             "--bundle-output android/app/src/main/assets/index.android.bundle", "--assets-dest",
             "android/app/src/main/res"],

    'adb_r': ["adb", "reverse", "tcp:8081", "tcp:8081"],
    'adb_log': ["adb", "logcat *:S", "ReactNative:V", "ReactNativeJS:V"],
    'adb_uninstall': ["adb", "{}", "uninstall", "{}"],
    'adb_i': ["adb", "install", "-r", "{}", "{}"],
    'adb_cp': ["adb", "{}", "push", "{}"],
    'adb_prompt_key_82': ["adb", "shell", "input", "keyevent", "82"],

    'set_env': ["SET", "ENVFILE={}"],

    'gradle_c': ["gradlew", "clean"],
    'gradle_b': ["gradlew", "assembleRelease"],
    'gradle_bx': ["gradlew", "assembleRelease", "-x", "bundleReleaseJsAndAssets"],

    'emu_l': "cd %ANDROID_HOME%/emulator && emulator -avd Pixel_2_API_29 -no-snapshot-load",
    'emu_l_arm64': "cd %ANDROID_HOME%/emulator && emulator -avd Nexus_One_API_25 -no-snapshot-load",
    'emu_l_tab': "cd %ANDROID_HOME%/emulator && emulator -avd Pixel_C_API_29 -no-snapshot-load",

    'jb_l': "cd C:/jboss-eap-7.0/bin && standalone.bat",
    'ngrok_l': "cd C:/Users/u958288/Downloads/ngrok-stable-windows-amd64 && ngrok http 5001",
    'gitbash_l': "start \"\" \"C:/Program Files/Git/bin/sh.exe\"",

    'sudo': "powershell -Command \"Start-Process cmd -Verb RunAs\"",
}

## SCRIPT PARSER ARGUMENTS
parser = argparse.ArgumentParser()
group_commandType = parser.add_argument_group(description="")
group_apkType = parser.add_mutually_exclusive_group()
group_target = parser.add_mutually_exclusive_group()

parser.add_argument('-v', '--verbose', dest='v', action='store_true', help="display all output of the process")
parser.add_argument('-x', action='store_true', help="build apk without bundling")
parser.add_argument('-env', choices=['dev', 'hom', 'prod', 'local'], default="dev",
                    help="set the environment file (dev per default)")
parser.add_argument('-bd', '--build_dst', type=str, dest='build_dst',
                    help="copy the generated apk to the mentioned folder (default build directory if none were mentioned)")
parser.add_argument('-ws', '--workspace', type=str, dest='workspace',
                    help="set the folder in which the script will run")
parser.add_argument('-td', '--tr_dst', type=str, dest='tr_dst',
                    help="transfer the generated apk to the mentioned device folder")
parser.add_argument('-un', '--uninstall', action='store_true', dest='uninstall',
                    help="uninstall apk on the device (default application.id if none were mentioned)")
parser.add_argument('-t', '--transfer', action='store_true', dest='transfer',
                    help="transfer the apk to the device (default directory if none were mentioned)")

group_commandType.add_argument('-l', '--launch', action='store_true', dest='launch',
                               help="run react-native run-android")
group_commandType.add_argument('-c', '--clean', action='store_true', dest='clean',
                               help="clean build folder")
group_commandType.add_argument('-b', '--build', action='store_true', dest='build',
                               help="build apk (--launch arg will not be executed if the both are mentioned)")
group_commandType.add_argument('-i', '--install', action='store_true', dest='install',
                               help="clean, build, install apk (--launch arg will not be executed if both "
                                    "are mentioned)")

group_apkType.add_argument('-rl', '--release', action='store_true', dest='release',
                           help="build release apk (debug apk per default)")

group_target.add_argument('-d', '--device', type=str, dest='target',
                          help="set the target device (behave as adb -d arg)")
group_target.add_argument('-e', '--emulator', type=str, dest='target',
                          help="set the target emulator (behave as adb -e arg)")

## SCRIPT VARIABLES
args = parser.parse_args().__dict__
device = ""
verbose = False


## SCRIPT FUNCTIONS


def run_process(title, full_cmd):
    global verbose

    print(STRINGS['PROCESS_RUNNER']['start'].format(title.upper()))
    print()
    process = subprocess.Popen(
        full_cmd,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        universal_newlines=True
    )
    while True:
        output = process.stdout.readline()
        if verbose is True:
            print(output.strip())
        else:
            print("\r" + output.strip(), end=" ")
        # Do something else
        return_code = process.poll()
        if return_code is not None:
            # Process has finished, read rest of the output
            for output in process.stdout.readlines():
                if verbose is True:
                    print(output.strip())
                else:
                    print("\r" + output.strip(), end=" ")
            for stderr in process.stderr.readlines():
                print(stderr.strip())
            print()
            print('RETURN CODE', return_code)
            print()
            break
    print(STRINGS['PROCESS_RUNNER']['end'].format(title.upper()))
    print()


def check_if_env_files_exist():
    files = [f for f in listdir(os.curdir) if isfile(join(os.curdir, f))]

    for f in files:
        if 'env' in f:
            return True
    return False


def set_environment_file(env):
    if check_if_env_files_exist() is not True:
        print(STRINGS['ENVIRONMENT_FILES']['not_found'])
        print()
        return

    environment_value = ENV_FILE.get(env)
    cmd = deepcopy(CMD_S['set_env'])
    cmd[1] = cmd[1].format(environment_value)

    run_process(
        STRINGS['ENVIRONMENT_FILES']['cmd_title'].format(environment_value),
        cmd
    )


def init_script_variables(target, v):
    global verbose

    set_device_variable(target)

    if v is True:
        verbose = v


def set_device_variable(target):
    global device

    if target is not None:
        device = target
    else:
        device = select_device_automatically()


def select_device_automatically():
    return DEFAULT_DEVICE


def launch_rr():
    run_process(
        STRINGS['ENVIRONMENT_FILES']['cmd_title'],
        CMD_S['rr']
    )


def clean_build_folder():
    run_process(
        STRINGS['GRADLE']['clean'],
        CMD_S['gradle_c']
    )


def build_apk(exclude):
    if exclude:
        run_process(
            STRINGS['GRADLE']['build_x'],
            CMD_S['gradle_bx']
        )
        return
    run_process(
        STRINGS['GRADLE']['build'],
        CMD_S['gradle_b']
    )


def install_apk(apk):
    cmd = deepcopy(CMD_S['adb_i'])
    cmd[3] = cmd[3].format(device)
    cmd[4] = cmd[4].format(apk)

    run_process(
        STRINGS['ADB']['install'].format(apk.split('/')[-1])
        ,
        cmd
    )


def run_full_process():
    clean_build_folder()
    build_apk(False)
    install_apk(DEFAULT_APK_SRC_DIR)


## MAIN

init_script_variables(args['target'], args['v'])
set_environment_file(args['env'])
print()
print(os.getcwd() + "\\android")
print()
if args['install']:
    with cd(os.getcwd() + "\\android"):
        run_full_process()
else:
    with cd(os.getcwd() + "\\android"):
        if args['clean']:
            clean_build_folder()
        if args['x'] & args['build']:
            build_apk(True)
        elif args['build']:
            build_apk(False)

    if args['launch']:
        launch_rr()

import argparse
import os

DEFAULT_CP_SRC_DIR = '/android/app/build/outputs/apk/release/app-release.apk'
DEFAULT_CP_DST_DIR = '/storage/self/primary/'

APP_ID_POCKETBANK = "ma.gbp.pocketbank"
APP_ID_SPACEANIMATION = "com.animationsx"

WORKSPACE_POCKETBANK = "C:\\Users\\u958288\WebstormProjects\\PocketBank"
WORKSPACE_SPACEANIMATION = "C:\\Users\\u958288\\WebstormProjects\\react-native-space-animation"

ENV_DEV = ".env"
ENV_HOM = ".env.homologation"
ENV_PROD = ".env.production"
ENV_LOCAL = ".env.local"

parser = argparse.ArgumentParser()
mutual_ex_group_builder = parser.add_mutually_exclusive_group()
mutual_ex_group_device = parser.add_mutually_exclusive_group()
mutual_ex_group_installer = parser.add_mutually_exclusive_group()
mutual_ex_group_installer_group = mutual_ex_group_installer.add_argument_group()

parser.add_argument('-cln', '--clean', action='store_true', help='clean android build directory')
parser.add_argument('-cp', '--copy', action='store_true',
					help='copy apk from (default) {} to {}'.format(DEFAULT_CP_SRC_DIR, DEFAULT_CP_DST_DIR))

mutual_ex_group_builder.add_argument('-b', '--build', action='store_true',
									 help='build android apk using \'assembleRelease\'')
mutual_ex_group_builder.add_argument('-bx', '--buildx', action='store_true',
									 help='build android apk using \'assembleRelease -x\'')

mutual_ex_group_device.add_argument('-d', '--device', action='store_true', help='set target to physical device')
mutual_ex_group_device.add_argument('-e', '--emulator', action='store_true', help='set target to emulator')

mutual_ex_group_installer.add_argument('-at', '--auto', action='store_true',
									   help='will generate index.bundle & apk, uninstall if required then install')
mutual_ex_group_installer_group.add_argument('-i', '--install', action='store_true',
											 help='will install apk on the device of choice')
mutual_ex_group_installer_group.add_argument('-un', '--uninstall', action='store_true',
											 help='will uninstall apk before installing it on the device of choice')

#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#


rr = "react-native run-android"
rr_s = "react-native start"

adb_r = "adb reverse tcp:8081 tcp:8081"
adb_log = "adb logcat *:S ReactNative:V ReactNativeJS:V"
adb_uninstall = "adb @argsOpt uninstall @argsPos"
adb_i = "adb $1 uninstall %TWX% & adb install -r $1 $2/android/app/build/outputs/apk/release/app-release.apk"
adb_c = "adb $1 push $2/android/app/build/outputs/apk/release/app-release.apk /storage/self/primary/"
adb_rd = "adb shell input keyevent 82"

set_env = "SET ENVFILE=\\'.env.dev\\'"

build_bundle = "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
gradle_c = "cd ./android && gradlew clean && cd.."
gradle_cr = "cd ./android && gradlew clean && cd.. && react-native run-android"
gradle_cb = "cd ./android && gradlew clean && gradlew assembleRelease && cd.."
gradle_cbx = "setEnv@ &&cd ./android && gradlew clean && cd.. && buildApk@@ && cd ./android && gradlew assembleRelease -x bundleReleaseJsAndAssets && cd.."
gradle_b = "cd ./android && gradlew assembleRelease && cd.."
gradle_bx = "setEnv@ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd ./android && gradlew assembleRelease -x bundleReleaseJsAndAssets && cd.."

emu_l = "cd %ANDROID_HOME%/emulator && emulator -avd Pixel_2_API_29 -no-snapshot-load"
emu_l_arm64 = "cd %ANDROID_HOME%/emulator && emulator -avd Nexus_One_API_25 -no-snapshot-load"
emu_l_tab = "cd %ANDROID_HOME%/emulator && emulator -avd Pixel_C_API_29 -no-snapshot-load"

jb_l = "cd C:/jboss-eap-7.0/bin && standalone.bat"
ngrok_l = "cd C:/Users/u958288/Downloads/ngrok-stable-windows-amd64 && ngrok http 5001"
gitbash_l = "start \"\" \"C:/Program Files/Git/bin/sh.exe\""

sudo = "powershell -Command \"Start-Process cmd -Verb RunAs\""

parser = argparse.ArgumentParser()
group = parser.add_mutually_exclusive_group()
group.add_argument("-v", "--verbose", action="store_true")
group.add_argument("-q", "--quiet", action="store_true")
parser.add_argument("x", type=int, help="the base")
parser.add_argument("y", type=int, help="the exponent")
args = parser.parse_args()
answer = args.x ** args.y

if args.quiet:
	print(answer)
elif args.verbose:
	print("{} to the power {} equals {}".format(args.x, args.y, answer))
else:
	print("{}^{} == {}".format(args.x, args.y, answer))

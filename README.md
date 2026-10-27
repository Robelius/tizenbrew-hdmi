# tizenbrew-hdmi

A TizenBrew module for a Samsung TU7000 (Tizen 5.5): a full-screen photo with the clock, date and an "HDMI 2" status line.

- **Photo:** put a 3840×2160 (or 1920×1080) JPEG at `app/photo.jpg`. Without one, `app/hills.svg` (a green hill under a blue sky) is shown.
- **HDMI 2 status:** the bottom line shows whether the console on HDMI 2 is on.
- **Back to the photo:** the background service watches HDMI 2 and reopens TV Home when the console turns off.
- **Diagnostics:** press **Blue** on the remote.

## Install on the TV

1. In TizenBrew, open the module manager and add the GitHub module `Robelius/tizenbrew-hdmi`.
2. In TizenBrew settings, set **TV Home** as the autolaunch module and add it to the autolaunch services.
3. On the TV, turn on **Settings → General → External Device Manager → Anynet+ (HDMI-CEC)** so the TV switches to HDMI 2 when the console turns on.

## Preview in a browser

Open `app/index.html`. Press **H** to simulate the console turning on or off, **B** for diagnostics.

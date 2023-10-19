# M8W-Plus-Linux
Configura de tela sensível ao toque.
# ATENÇÃO
Copiar a pasta /etc somente se interface for XFCE, caso contrario utilizar https://github.com/reinderien/xcalibrate e configurar.
#Click botão direito
- to get right-click emulation, edit /usr/share/X11/xorg.conf.d/10-evdev.conf to contain:
Procure essa seção e adicione os lementos que contem #++
Section "InputClass"
  Identifier "evdev touchscreen catchall"
  MatchIsTouchscreen "on"
  MatchDevicePath "/dev/input/event*"
  Driver "evdev"
  Option "EmulateThirdButton" "1" #++
  Option "EmulateThirdButtonTimeout" "500" #++
  Option "EmulateThirdButtonMoveThreshold" "30" #++
EndSection

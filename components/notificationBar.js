import { HStack, Button, Snackbar } from "@react-native-material/core";

export default function NotificationBar(props) {
  return (
    <Snackbar
      message={props.message}
      action={
        <HStack>
          {props.buttons.map((button) => (
            <Button variant="text" title={button.title} color="#BB86FC" compact onPress={() => {
              if (button.onPress != undefined)
              {
                button?.onPress();
              }
            }} />
          ))}
        </HStack>}
      style={{ position: "absolute", start: 16, end: 16, top: 40, zIndex: 2 }}
    />
  );
}
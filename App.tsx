// A multiline Input with overflowing text in the middle of a Scroll.
import { mount, Scroll, signal, Text, View } from "nsh";
import { Input } from "nsh/base";

const long = Array.from({ length: 59 }, (_, i) => `line ${i + 1}`).join("\n");

function App() {
  const page = signal(0);
  return (
    <View class="flex-1 bg-background">
      <Text class="p-2 text-foreground">page:{Math.round(page())}</Text>
      <Scroll testID="page" class="flex-1" onScroll={(e) => page.set(e.offset.y)}>
        {/* Puts the input in the middle of the viewport, where the gesture lands. */}
        <View class="h-[180px]" />
        <Input multiline defaultValue={long} class="h-[200px] mx-8 border border-border" />
        <View class="h-[2000px]" />
      </Scroll>
    </View>
  );
}

mount(App);

import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import screen from "src/utils/screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MinitureLayout from "./minitureLayout";

export default () => {
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [expand, setExpand] = useState(false);
  const snapPoints = useMemo(
    () => [insets.bottom + 60, screen.height - insets.top],
    []
  );
  const handleSheetChanges = useCallback((index) => {
    setExpand(index == 0);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View
        style={{
          height: expand
            ? insets.bottom + 20
            : screen.height - insets.top - insets.bottom,
        }}
      >
        {expand ? <MinitureLayout /> : null}
      </View>
    </BottomSheet>
  );
};

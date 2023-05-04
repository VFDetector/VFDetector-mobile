import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import screen from "src/utils/screen";
import DetailLayout from "./detailLayout";
import MinitureLayout from "./minitureLayout";

export default () => {
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [expand, setExpand] = useState(true);
  const snapPoints = useMemo(
    () => [insets.bottom + 80, screen.height - insets.top],
    []
  );
  const handleSheetChanges = (index) => {
    setExpand(index == 0);
  };

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
        {expand ? (
          <MinitureLayout />
        ) : (
          <DetailLayout bottomSheetRef={bottomSheetRef} />
        )}
      </View>
    </BottomSheet>
  );
};

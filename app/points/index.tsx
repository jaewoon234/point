import { router } from "expo-router"; // <-- 추가
import { useContext, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { addPoint, getPoints } from "../../lib/pointApi";

export default function PointScreen() {
  const { logout } = useContext(AuthContext);
  const [list, setList] = useState(getPoints());

  const onAddPoint = () => {
    addPoint();
    setList([...getPoints()]);
  };

  const onLogout = async () => {
    await logout(); // AuthContext의 logout 실행
    router.replace("/login"); // 로그인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 상단 여백 */}
      <View style={{ marginBottom: 20 }}>
        <Button title="로그아웃" onPress={onLogout} />
      </View>

      {/* 포인트 적립 버튼 */}
      <View style={{ marginBottom: 20 }}>
        <Button title="포인트 적립" onPress={onAddPoint} />
      </View>

      {/* 포인트 리스트 */}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.point}P</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: { fontWeight: "bold" },
});

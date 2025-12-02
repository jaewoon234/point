import { router } from "expo-router"; // <-- 추가
import { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("test"); // 테스트 편의상 기본값 지정
  const [pw, setPw] = useState("1234");
  const [error, setError] = useState("");

  const onLogin = async () => {
    console.log("Login pressed:", id, pw);
    setError("");
    try {
      const ok = await login(id.trim(), pw);
      console.log("login() returned:", ok);
      if (ok) {
        // 토큰/상태 저장이 끝난 뒤 명시적으로 라우팅
        router.replace("/points");
      } else {
        setError("로그인 실패! 아이디/비번 확인");
      }
    } catch (e) {
      console.error("login error:", e);
      Alert.alert("오류", "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        placeholder="ID (test)"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />
      <TextInput
        placeholder="PW (1234)"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="로그인" onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  error: { color: "red", marginBottom: 10 },
});

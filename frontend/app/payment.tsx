import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar, 
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import WebView from 'react-native-webview';

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);

  // 결제 성공 처리
  const handlePaymentSuccess = () => {
    Alert.alert(
      '성공',
      '프리미엄 멤버십이 활성화되었습니다!',
      [{ text: '확인', onPress: () => router.replace('/profile') }]
    );
  };

  // 웹뷰에서 메시지 수신
  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.status === 'success') {
      handlePaymentSuccess();
    }
  };

  // 결제 페이지 HTML
  const paymentHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            background: #000; 
            color: #fff; 
            font-family: -apple-system, sans-serif;
            margin: 20px;
          }
          button {
            background: #4A90E2;
            color: white;
            border: none;
            padding: 15px;
            width: 100%;
            border-radius: 10px;
            font-size: 16px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h2>Re:connect 프리미엄</h2>
        <p>월 9,900원</p>
        <button onclick="window.ReactNativeWebView.postMessage(JSON.stringify({status: 'success'}))">
          결제하기
        </button>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>처리중...</Text>
        </View>
      ) : (
        <WebView
          source={{ html: paymentHTML }}
          style={styles.webview}
          onMessage={handleWebViewMessage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PaymentScreen; 
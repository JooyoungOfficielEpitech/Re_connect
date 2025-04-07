import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { missionApi, MissionResponse } from '../services/api';

export const MissionListPage: React.FC = () => {
  const [missions, setMissions] = useState<MissionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const data = await missionApi.getMissions();
      setMissions(data);
      setError(null);
    } catch (err) {
      setError('미션을 불러오는데 실패했습니다.');
      console.error('Error loading missions:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderMission = ({ item }: { item: MissionResponse }) => (
    <TouchableOpacity style={styles.missionItem}>
      <Text style={styles.missionTitle}>{item.title}</Text>
      <Text style={styles.missionDescription}>{item.description}</Text>
      <Text style={styles.missionStatus}>
        {item.completed ? '완료' : '진행중'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadMissions}>
          <Text>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={missions}
        renderItem={renderMission}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadMissions}
        ListEmptyComponent={
          <Text style={styles.emptyText}>등록된 미션이 없습니다.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  missionItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  missionStatus: {
    fontSize: 12,
    color: '#888',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 32,
  },
}); 
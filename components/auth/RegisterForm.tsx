'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      router.push('/');
    } catch {
      setError('สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <Input
        type="text"
        label="ชื่อ-นามสกุล"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="สมชาย ใจดี"
        required
        fullWidth
      />

      <Input
        type="email"
        label="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        fullWidth
      />

      <Input
        type="password"
        label="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        fullWidth
      />

      <Input
        type="password"
        label="ยืนยันรหัสผ่าน"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        required
        fullWidth
      />

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
      </Button>

      <p className="text-sm text-gray-600 text-center">
        Demo: ใส่ข้อมูลอะไรก็ได้เพื่อทดสอบ (ไม่ได้เชื่อมกับ backend จริง)
      </p>
    </form>
  );
}

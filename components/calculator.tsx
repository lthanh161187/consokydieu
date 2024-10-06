'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalculatorComponent() {
  const [gender, setGender] = useState('female')
  const [birthday, setBirthday] = useState('')
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(170)
  const [goal, setGoal] = useState('maintain')
  
  const [bmr, setBmr] = useState(0)
  const [amr, setAmr] = useState(0)
  const [emr, setEmr] = useState(0)
  const [tmr, setTmr] = useState(0)
  const [total, setTotal] = useState(0)
  const [magicNumber, setMagicNumber] = useState(0)

  const calculateAge = (birthday: string | number | Date) => {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  useEffect(() => {
    const age = calculateAge(birthday)
    
    // Calculate BMR using Harris-Benedict equation
    let calculatedBmr
    if (gender === 'female') {
      calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    } else {
      calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    }
    setBmr(calculatedBmr)

    // Calculate AMR
    const amrMultiplier = gender === 'female' ? 0.25 : 0.3
    const calculatedAmr = calculatedBmr * amrMultiplier
    setAmr(calculatedAmr)
    
    // Calculate TMR
    const calculatedTmr = calculatedBmr + calculatedAmr
    setTmr(calculatedTmr)
    
    // Calculate Total
    const newTotal = calculatedTmr + emr
    setTotal(newTotal)

    // Calculate the magic number based on the selected goal
    let newMagicNumber = newTotal
    switch (goal) {
      case 'maintain':
        newMagicNumber = newTotal
        break
      case 'lose-fast':
        newMagicNumber = newTotal - 500
        break
      case 'lose-slow':
        newMagicNumber = newTotal - 300
        break
      case 'gain-fast':
        newMagicNumber = newTotal + 500
        break
      case 'gain-slow':
        newMagicNumber = newTotal + 300
        break
    }
    setMagicNumber(newMagicNumber)
  }, [gender, birthday, weight, height, emr, goal])

  const formatNumber = (value: number) => {
    return value > 0 ? value.toString().replace(/^0+/, '') : value
  }

  return (
    <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Hãy nhớ con số kỳ diệu để có những điều vi diệu trong đời sống.</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label>Giới tính</Label>
              <RadioGroup
                defaultValue="female"
                onValueChange={setGender}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Nữ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Nam</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="birthday">Ngày sinh</Label>
              <Input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Cân nặng (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formatNumber(weight)}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="Nhập cân nặng (kg)"
              />
            </div>
            <div>
              <Label htmlFor="height">Chiều cao (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formatNumber(height)}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Nhập chiều cao (cm)"
              />
            </div>
            <div>
              <Label htmlFor="emr">EMR (Tỷ lệ trao đổi chất khi tập thể dục)</Label>
              <Input
                id="emr"
                type="number"
                value={formatNumber(emr)}
                onChange={(e) => setEmr(Number(e.target.value))}
                placeholder="Nhập EMR"
              />
            </div>
            <div>
              <Label>BMR (Tỷ lệ trao đổi chất cơ bản)</Label>
              <Input 
                value={bmr.toFixed(2)} 
                readOnly 
                className="font-bold text-[#41865C]"
              />
            </div>
            <div>
              <Label>AMR (Tỷ lệ trao đổi chất hoạt động)</Label>
              <Input value={amr.toFixed(2)} readOnly />
            </div>
            <div>
              <Label>TMR (Tổng tỷ lệ trao đổi chất)</Label>
              <Input value={tmr.toFixed(2)} readOnly />
            </div>
            <div>
              <Label>Tổng năng lượng tiêu thụ hàng ngày</Label>
              <Input value={total.toFixed(2)} readOnly />
            </div>
            <div>
              <Label>Mục tiêu</Label>
              <Select onValueChange={setGoal} defaultValue="maintain">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mục tiêu của bạn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain">Giữ cân (Cấu trúc)</SelectItem>
                  <SelectItem value="lose-fast">Giảm mỡ (giảm cân nhanh)</SelectItem>
                  <SelectItem value="lose-slow">Giảm mỡ (giảm cân chậm)</SelectItem>
                  <SelectItem value="gain-fast">Tăng cơ (tăng cân nhanh)</SelectItem>
                  <SelectItem value="gain-slow">Tăng cơ (tăng cân chậm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Con số kỳ diệu</Label>
              <Input 
                value={magicNumber.toFixed(2)} 
                readOnly 
                className="font-bold text-[#41865C]"
              />
            </div>
          </form>
        </CardContent>
      </Card>
  )
}
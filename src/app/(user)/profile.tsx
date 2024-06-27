import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { supabase } from '@/src/lib/supabase'

const ProfileScreen = () => {
  return (
    <View>
        <Text>Profile</Text>
        <Button title="Sign Out" onPress={async () => 
            await supabase.auth.signOut()}
             
             />
    </View>
  )
}

export default ProfileScreen
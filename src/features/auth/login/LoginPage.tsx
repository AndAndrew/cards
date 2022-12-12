import { Button } from '../../../common/components/button/Button'
import { Input } from '../../../common/components/input/Input'

export const LoginPage = () => {
  return (
    <div>
      <form>
        <h2>Sign in</h2>
        <Input title={''} callBack={() => {}} />
        <Input title={''} callBack={() => {}} />
        <span>
          <input type={'checkbox'} />
        </span>
        <span>Remember me</span>
        <a href={'/passRecovery'}>Forgot Password?</a>
        <Button title={'Sing In'} onClick={() => {}} />
        <div>Already have an account?</div>
        <a href={'/passRecovery'}>Sing In</a>
      </form>
    </div>
  )
}

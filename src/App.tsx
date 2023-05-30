import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import './App.css'
import '@picocss/pico'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import schema from './validation-schema'

export default function App() {
  const [selectState, setSelectState] = useState('')

  type FormData = z.infer<typeof schema>

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      preparation_time: '00:00:00',
      no_of_slices: 1,
      diameter: 33.4,
      spiceness_scale: 1,
      slices_of_bread: 1,
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await fetch(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )
      const jsonData = await response.json()
      console.log(jsonData)
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    }
  }

  let optionalFields

  switch (selectState) {
    case 'pizza':
      optionalFields = (
        <>
          <div className='field-container'>
            <label>Number of slices</label>
            <input
              {...register('no_of_slices')}
              aria-invalid={errors.no_of_slices ? 'true' : undefined}
            />
            <small>{errors.no_of_slices?.message}</small>
          </div>
          <div className='field-container'>
            <label>Diameter</label>
            <input
              {...register('diameter')}
              aria-invalid={errors.diameter ? 'true' : undefined}
            />
            <small>{errors.diameter?.message}</small>
          </div>
        </>
      )
      break
    case 'soup':
      optionalFields = (
        <>
          <div className='field-container'>
            <label>Spiceness scale</label>
            <input
              {...register('spiceness_scale')}
              aria-invalid={errors.spiceness_scale ? 'true' : undefined}
            />
            <small>{errors.spiceness_scale?.message}</small>
          </div>
        </>
      )
      break
    case 'sandwich':
      optionalFields = (
        <>
          <div className='field-container'>
            <label>Slices of bread</label>
            <input
              {...register('slices_of_bread')}
              aria-invalid={errors.slices_of_bread ? 'true' : undefined}
            />
            <small>{errors.slices_of_bread?.message}</small>
          </div>
        </>
      )
      break
    default:
      break
  }

  function handleSelectChange(value: string) {
    setSelectState(value)
    unregister([
      'no_of_slices',
      'diameter',
      'spiceness_scale',
      'slices_of_bread',
    ])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='field-container'>
        <label>Name</label>
        <input
          {...register('name')}
          aria-invalid={errors.name ? 'true' : undefined}
        />
        <small>{errors.name?.message}</small>
      </div>
      <div className='field-container'>
        <label>Preparation Time</label>
        <input
          defaultValue={'00:00:00'}
          {...register('preparation_time')}
          aria-invalid={errors.preparation_time ? 'true' : undefined}
        />
        <small>{errors.preparation_time?.message}</small>
      </div>
      <div className='field-container'>
        <label>Type</label>
        <select
          {...register('type')}
          defaultValue=''
          onChange={(e) => handleSelectChange(e.target.value)}
          aria-invalid={errors.type ? 'true' : undefined}
        >
          <option value=''>Select a type</option>
          <option value='pizza'>pizza</option>
          <option value='soup'>soup</option>
          <option value='sandwich'>sandwich</option>
        </select>
        <small>{errors.type?.message}</small>
      </div>
      {optionalFields}
      <input type='submit' value='Send Request' />
    </form>
  )
}

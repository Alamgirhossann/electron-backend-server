import { RedisClient } from '../../../shared/redis'
import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemister.constant'
import { IAcademicSemisterCreatedEvent } from './academicSemister.interface'
import { AcademicSemisterService } from './academicSemister.service'

const initAcademicSemesterEvents = () => {
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async (e: string) => {
    const data: IAcademicSemisterCreatedEvent = JSON.parse(e)
    await AcademicSemisterService.createSemisterFromEvent(data)
    console.log(data)
  })
}

export default initAcademicSemesterEvents

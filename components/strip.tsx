'use client'

// import { PRACTICE_AREAS } from '@/lib/content'
import { PRACTICE_AREAS } from '@/lib/content'
import { Revel, RevelGroup } from './revel'

const Strip = () => {

    return (
        <section
            className="border-y border-hairline py-6"
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
                <RevelGroup
                    as="ul"
                    className="
                        flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory
                        md:grid md:grid-cols-3
                        lg:grid lg:grid-cols-5 lg:gap-0
                        scrollbar-hide
                    "
                >
                    {
                        PRACTICE_AREAS.map((area, index) => (
                            <Revel
                                as="li"
                                key={index}
                                className="
                    flex min-w-[220px] shrink-0 snap-start flex-col gap-1
                    px-0
                    md:min-w-0
                    lg:px-5
                    lg:[&:not(:first-child)]:border-l
                    lg:[&:not(:first-child)]:border-hairline
                "
                            >
                                <span className="text-muted-ink uppercase eyebrow">
                                    {area.k}
                                </span>
                                <span className='text-sm font-medium tracking-[-0.01em] text-ink'>
                                    {area.v}
                                </span>

                            </Revel>
                        ))
                    }
                </RevelGroup>
            </div>


        </section>
    )
}

export default Strip
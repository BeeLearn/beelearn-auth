import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

import genders from "~/data/genders";
import type { Goal } from "~/data/goals";
import type { Gender } from "~/data/genders";

import type { Category } from "~/lib/api/models/category.model";

import Icon from "./Icon.vue";
import GoalTab from "./quizTabs/GoalTab.vue";
import GenderTab from "./quizTabs/GenderTab.vue";
import UsernameTab from "./quizTabs/UsernameTab.vue";
import InterestTab from "./quizTabs/InterestTab.vue";
import NameTab, { type Name } from "./quizTabs/NameTab.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const config = useRuntimeConfig();

const user = computed(() => userStore.user);
const userGender = computed(() => {
  const gender = genders.find(element => element.name.toLowerCase() === user.value?.gender.toLowerCase());
  if (gender) gender.checked = true;
  return gender ?? null;
});

const selectedIndex = ref(0);

const onNextPage = function () {
  selectedIndex.value += 1;
}

const goal = ref<Goal | null>(null);
const username = ref<string | null>(null);
const gender = ref<Gender | null>(userGender.value);
const interests = ref<Category[]>(user.value!.categories);
const name = ref<Name>({
  firstName: user.value?.first_name ?? null,
  lastName: user.value?.last_name ?? null,
});

const onSubmit = async function (callback: () => void) {
  const payload = {
    username: username.value!,
    first_name: name.value.firstName!,
    last_name: name.value.lastName!,
    profile: {
      daily_streak_minutes: goal.value!.value,
    },
    categories: {
      add: interests.value.map(interest => interest.id),
    },
    gender: gender.value!.name.toUpperCase(),
  };

  userStore.updateUser(payload)
    .then(() => {
      toast.success('Profile updated successfully');
      const redirect = route.query.redirect as string;
      if (redirect) window.location.replace(redirect);
      else window.location.replace(config.public.dashboardBaseUrl);
    })
    .catch(() => toast.error('An unexpected error occur. Try again!'))
    .finally(() => callback());
}

export default function QuizPage() {
  const tabs = computed(() => [
    <GenderTab
      value={gender.value}
      onSubmit={onNextPage}
      onUpdate:value={value => gender.value = value} />,
    <InterestTab
      value={interests.value}
      onSubmit={onNextPage}
      onUpdate:value={value => interests.value = value} />,
    <GoalTab
      value={goal.value}
      onSubmit={onNextPage}
      onUpdate:value={value => goal.value = value} />,
    <UsernameTab
      value={username.value}
      onSubmit={onNextPage}
      onUpdate:value={value => username.value = value} />,
    <NameTab
      value={name.value}
      onSubmit={onSubmit}
      onUpdate:value={value => {
        name.value.firstName = value.firstName;
        name.value.lastName = value.lastName;
      }} />,
  ]);

  onMounted(() => {
    if (userStore.user === null) router.replace("/");
  });

  return (
    <>
      <TabGroup
        key={selectedIndex.value}
        as="div"
        class="w-full flex-1 flex flex-col md:w-1/2 lg:w-1/3 overflow-y-scroll"
        selectedIndex={selectedIndex.value}
        onChange={index => selectedIndex.value = index}>
        <TabList
          as="div"
          class="flex items-center p-4">
          {
            tabs.value.map((tab, index) => (
              <>
                <Tab
                  as="div"
                  disabled={index > selectedIndex.value}>
                  <Icon
                    class={
                      index === selectedIndex.value ?
                        'i-mdi:circle text-violet-700 text-lg' :
                        index <= selectedIndex.value ?
                          'i-mdi:check-circle text-violet-700 text-lg' :
                          'i-mdi:circle text-slate-400 text-lg'
                    } />
                </Tab>
                {
                  index < tabs.value.length - 1 &&
                  <div class="flex-1 bg-slate-300">
                    <div class="w-1/10  p-0.3 transition-width duration-500" />
                  </div>
                }
              </>
            ))
          }
        </TabList>
        <TabPanels as="template">
          {
            tabs.value.map((tab, index) => (
              <TabPanel
                key={index}
                as="template">
                {tab}
              </TabPanel>
            ))
          }
        </TabPanels>
      </TabGroup>
    </>
  );
}

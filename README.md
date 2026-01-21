# js-api-firestore

With this incredible Firestore toolkit, you can easily start coding in JavaScript using annotations with Firestore from Google Cloud.

## A short word about OpenSource

Hi, my name is Andi. I work as a Lead iOS Engineer and Product Designer | Freelancing and Contract | Swift / iOS, macOS, GraphQL, Google Cloud and NodeJS for more than 13+ years 👋,

I actively maintain this toolkit. :rocket:

I love to share this reliable and efficient Firestore toolkit with you. You can use it whenever you want for free to develop an incredible data layer.

You can contact me at any time [contact@andireuter.com](mailto:contact@andireuter.com?subject=JS%20API%20Firestore).

You can find me on [![LinkedIn][1.2]][1], or on [![Behance][2.2]][2], or on [![HackerRank][3.2]][3].

[1.2]: https://raw.githubusercontent.com/andireuter/andireuter/main/img/linkedin.png "LinkedIn icon"
[2.2]: https://raw.githubusercontent.com/andireuter/andireuter/main/img/behance.png "Behance icon"
[3.2]: https://raw.githubusercontent.com/andireuter/andireuter/main/img/hackerrank.png "HackerRank icon"
[1]: https://www.linkedin.com/in/andireuter
[2]: https://www.behance.net/andireuter
[3]: https://www.hackerrank.com/andireuter

## Download and Install NPM Package

You have to paste this file `.npmrc` in the root folder of your code base. Because this NPM package is published to GitHub.

```bash
@andireuter:registry=https://npm.pkg.github.com
```

### NPM

```bash
npm install @andireuter/js-domain-principles
```

### Deno

```bash
deno add @andireuter/js-domain-principles
```

## API

A collection is also known as an entity. It contains a collection name and attributes to store data in Google Firestore.

You can declare the attributes with decorators to give it a purpose. Otherwise attributes without a decorator are being ignored.

```typescript
@Collection({ name: "collection name" })

@EntityKey({ type: "string" })

@Attribute({
  type: "[string|number|bool|object]",
  object?: object, // Don't append that if type isn't "object".
  optional: false
})

@ForeignKey({
  collection: object,
  optional: false
})
```

### Example

Look at the example below, first an entity is declared for a collection in Google Firestore. It does not inherit from anything and should be declared as an object.

```typescript
//
// RankingList.entity.ts
@Collection({ name: "RankingLists" })
class RankingList {
  @EntityKey({ type: "string" })
  id: string

  @Attribute({
    type: "number",
    optional: false,
  })
  scores: number[]

  @Attribute({
    type: "object",
    object: PlayingTime
    optional: false,
  })
  game: PlayingTime

  @Attribute({
    type: "object",
    object: Club
    optional: false,
  })
  clubs: Club[]

  @ForeignKey({
    collection: Game,
    optional: false,
  })
  game: Game
}
```

> Don't forget that every object property needs an initial value. Otherwise it gets undefined at run time. You can add a constructor or assign a value at definition.

You can directly access an instance of the Firestore context object, and hand over the collection as declared above or inherit from that same object to build a sophisticated custom context object yourself. Below you will find an example.

```typescript
//
// RankingList.context.ts
class RankingListContext extends Firestore<RankingList> {
  async insertRank(entity: RankingList): Promise<RankingList | undefined> {
    return await this.insert(entity)
  }

  async changeRank(entity: RankingList): Promise<RankingList | undefined> {
    return await this.changeById(entity)
  }

  async fetchRanks(): Promise<RankingList[] | undefined> {
    return await this.fetch(RankingList)
  }
}
```

## Further Reading

- [More Readability with Dependency Injection (TypeDI)](https://docs.typestack.community/typedi/v/develop/01-getting-started)

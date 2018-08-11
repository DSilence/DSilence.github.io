---
author: dsilencea
comments: true
date: 2017-09-28 11:50:41+00:00
layout: post
link: http://blog.sleepymaniac.com/2017/09/28/spatial-%d1%82%d0%b8%d0%bf%d1%8b-%d0%b8-efcore/
slug: spatial-%d1%82%d0%b8%d0%bf%d1%8b-%d0%b8-efcore
title: Spatial типы и EFCore
wordpress_id: 248
categories:
- Технический хаос
tags:
- .net
- .net core
- asp.net
- asp.net core
- c#
- coding
- efcore
- efcore2
- entity framework
- geography
- spatial
---

Как известно, EFCore по умолчанию не работает со Spatial типами. Тикет об их поддержке уже даавно лежит на [гитхабе](https://github.com/aspnet/EntityFrameworkCore/issues/1100). Увы, скорее всего ждать полноценной поддержки придётся ещё долго. Но варианты есть! Ниже можно увидеть доступные нам опции. <!-- more -->



	
  1. We go back in time. EF6 всё ещё есть, он работает, и в нём есть поддержка spatial типов через DbGeography и DbGeometry классы.

	
  2. Вооружившись знанием о том, что в efcore 2 появилась возможность определять свои [type mappings](https://github.com/aspnet/EntityFrameworkCore/issues/7434), прикрутить поддержку SqlServerTypes. Этот вариант будет работать только на windows, зато очень удобен.


Именно второй вариант мы и будем рассматривать. Для начала, создадим свой type mapping:

`gist:DSilence/83aa0c7a9c02345c294d075f01ba7a09#GeographyTypeMapping.cs`

Далее, нам нужно добавить в SqlServerTypeMapper новый маппинг. Расширяем класс:

`gist:DSilence/83aa0c7a9c02345c294d075f01ba7a09#CustomSqlServerTypeMapper.cs`

Здесь можно озаботиться синхронизацией, но основная идея – переопределить методы GetClrTypeMappings и GetStoreTypeMappings добавив в них наш маппинг для географии.

Далее осталось подменить IRelationalTypeMapper сервис нашей реализацией. Можно это сделать в ConfigureServices методе, а можно в вашем контексте переопределить OnConfiguring:

```csharp 
protected override void OnConfiguring(
  DbContextOptionsBuilder optionsBuilder)
{
  optionsBuilder
    .ReplaceService();
  base.OnConfiguring(optionsBuilder);
}
```

Всё? Почти.

Если вы используете InMemory провайдер для тестирования, вам нужно провернуть такую же фишку и в нём. К счастью, поддержка type mappings уже [доступна](https://github.com/aspnet/EntityFrameworkCore/issues/8010). Здесь вам надо зарегистрировать в DI другой интерфейс (ITypeMapper вместо IRelationalTypeMapper). Загвоздка заключается в том, что при добавлении регистрации InMemoryDatabase через UseInMemoryDatabase не происходит регистрация класса RelationalTypeMapperDependencies, в итоге его нельзя просто подменить через ReplaceService. Что делать?

Создаём ещё одного наследника:

`gist:DSilence/83aa0c7a9c02345c294d075f01ba7a09#TestTypeMapper.cs`

После чего мы в наших тестах мы можем делать следующее:

```csharp
var context = new YourContext(new DbContextOptionsBuilder()
                .UseInMemoryDatabase(“Test”)
                .ReplaceService().Options);
```

Вуаля!
